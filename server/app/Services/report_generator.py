from openai import AsyncOpenAI
from core.config import settings
import asyncio
import json
from typing import List, Dict

client = AsyncOpenAI(
    api_key=settings.OPENAI_API_KEY
)

MODEL = "gpt-4o-mini"

MAX_CHARS = 7000
MAX_FILES = 30



def chunk_code(code: str):
    return [
        code[i:i + MAX_CHARS]
        for i in range(0, len(code), MAX_CHARS)
    ]



def build_repository_context(files: List[Dict]):

    context = ""

    for file_data in files[:MAX_FILES]:

        context += f"""
FILE PATH:
{file_data.get("folder")}/{file_data.get("file_name")}

LANGUAGE:
{file_data.get("language")}

SOURCE CODE:
{file_data.get("code")}

----------------------------------
"""

    return context



async def audit_file_chunks(file_data: Dict):

    chunks = chunk_code(file_data["code"])

    audit_logs = []

    for chunk in chunks:

        response = await client.chat.completions.create(
            model=MODEL,
            temperature=0.2,
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "system",
                    "content": """
You are an expert production software code auditor.

Rules:
- Focus on real technical risks only.
- Do not hallucinate vulnerabilities.
- Do not output UI or irrelevant frontend cosmetic issues.
- Provide professional engineering audit reasoning.
"""
                },
                {
                    "role": "user",
                    "content": f"""
Analyze production risks.

Focus on:
- Architecture design flaws
- Security vulnerabilities
- Async blocking patterns
- Database misuse
- Authentication weaknesses
- Performance bottlenecks
- Resource leaks
- Scalability risks
- Code smells

Return STRICT JSON:

{{
  "summary": "",
  "issues": [
    {{
      "title": "",
      "severity": "Critical | High | Medium | Low",
      "reason": "",
      "impact": "",
      "fix": ""
    }}
  ]
}}

Code:

{chunk}
"""
                }
            ]
        )

        audit_logs.append(response.choices[0].message.content)

    return audit_logs



async def generate_repository_report(
        files: List[Dict],
        project_description: str
):

    if not files:
        return {
            "error": "No meaningful source code found for audit"
        }

    repository_context = build_repository_context(files)

    response = await client.chat.completions.create(
        model=MODEL,
        temperature=0.2,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": """
You are a principal level software architecture and security audit AI.

Generate enterprise grade executive repository audit report.

Output must be STRICT JSON ONLY.
"""
            },
            {
                "role": "user",
                "content": f"""
PROJECT DESCRIPTION:
{project_description}

REPOSITORY SOURCE CONTEXT:
{repository_context}

Generate professional audit report.

Return JSON:

{{
  "project_title": {project_description}
  "executive_summary": "",
  "technology_stack_understanding": "",
  "architecture_review": "",
  "security_assessment": "",
  "authentication_quality": "",
  "database_design_review": "",
  "async_concurrency_risks": "",
  "performance_risks": "",
  "production_readiness_score": 0,
  "technical_debt_level": "Low | Medium | High | Critical",
  "risk_severity_distribution": {{
      "critical": 0,
      "high": 0,
      "medium": 0,
      "low": 0
  }},
  "top_prioritized_improvements": []
}}
"""
            }
        ]
    )

    return json.loads(response.choices[0].message.content)