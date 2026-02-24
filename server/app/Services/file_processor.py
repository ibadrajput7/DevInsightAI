import os
import tempfile
import zipfile
import asyncio
from git import Repo


ALLOWED_EXTENSIONS = {
    ".py",
    ".js",
    ".ts",
    ".java",
    ".cpp",
    ".go"
}


LANGUAGE_MAP = {
    ".py": "python",
    ".js": "javascript",
    ".ts": "typescript",
    ".java": "java",
    ".cpp": "cpp",
    ".go": "go"
}

MAX_FILE_SIZE = 5 * 1024 * 1024


IGNORED_DIRECTORIES = {
    ".git",
    "node_modules",
    "venv",
    "env",
    "__pycache__",
    ".idea",
    ".vscode",
    "dist",
    "build",
    "migrations",
    "alembic",
    "site-packages",
    "tests",
    "docs",
    "coverage",
    ".pytest_cache"
}


IGNORED_FILES = {
    "manage.py",
    "setup.py",
    "conftest.py"
}



async def process_github_repo(github_url: str):

    with tempfile.TemporaryDirectory() as temp_dir:

        await asyncio.to_thread(
            Repo.clone_from,
            github_url,
            temp_dir
        )

        return await asyncio.to_thread(
            extract_source_files,
            temp_dir
        )



async def process_uploaded_archive(archive):

    with tempfile.TemporaryDirectory() as temp_dir:

        temp_path = os.path.join(temp_dir, archive.filename)
        content = await archive.read()

        await asyncio.to_thread(write_file, temp_path, content)

        if zipfile.is_zipfile(temp_path):
            await asyncio.to_thread(extract_zip, temp_path, temp_dir)

        return await asyncio.to_thread(
            extract_source_files,
            temp_dir
        )


def write_file(path, content):
    with open(path, "wb") as f:
        f.write(content)


def extract_zip(zip_path, extract_to):
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(extract_to)



def extract_source_files(root_dir: str):
    """
    Extract ONLY meaningful source code files.
    No configs, no virtualenv, no packages, no docs, no tests.
    """

    results = []

    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [
            d for d in dirs
            if d not in IGNORED_DIRECTORIES
            and not d.startswith(".")
        ]

        for file in files:
            if file.startswith("."):
                continue

            if file in IGNORED_FILES:
                continue

            ext = os.path.splitext(file)[1]

            if ext not in ALLOWED_EXTENSIONS:
                continue

            file_path = os.path.join(root, file)

            try:
                if os.path.getsize(file_path) > MAX_FILE_SIZE:
                    continue

                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    code = f.read()

                if len(code.strip()) < 100:
                    continue

                if code.count(";") > 2000:
                    continue

                relative_path = os.path.relpath(file_path, root_dir)
                folder = os.path.dirname(relative_path)

                results.append({
                    "folder": folder if folder else "root",
                    "file_name": file,
                    "language": LANGUAGE_MAP.get(ext),
                    "code": code
                })

            except Exception:
                continue


    return results[:30]