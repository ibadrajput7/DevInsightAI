import smtplib
from email.message import EmailMessage
from pathlib import Path
from string import Template
from core.config import settings


SMTP_EMAIL = settings.SMTP_EMAIL
SMTP_PASSWORD = settings.SMTP_PASSWORD


def send_welcome_email(name: str, recipient_email: str):
    template_path = Path(__file__).resolve().parent.parent / "templates" / "welcome_email.html"

    html_template = Template(template_path.read_text())

    email = EmailMessage()
    email["From"] = SMTP_EMAIL
    email["To"] = recipient_email
    email["Subject"] = "Welcome to our platform!"

    email.set_content(
        html_template.substitute({"name": name, "year": 2026}),
        subtype="html"
    )

    try:
        with smtplib.SMTP(host="smtp.gmail.com", port=587) as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.login(SMTP_EMAIL, SMTP_PASSWORD)
            smtp.send_message(email)

        print("Email sent successfully!")

    except Exception as e:
        print(f"Email sending failed: {str(e)}")