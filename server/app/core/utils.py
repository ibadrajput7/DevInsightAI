import random
import hashlib

def generate_otp():
    return str(random.randint(100000, 999999))

def hash_code(code: str):
    return hashlib.sha256(code.encode()).hexdigest()