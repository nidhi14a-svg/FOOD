from pathlib import Path
import re
base = Path(__file__).resolve().parent.parent / 'backend'
patterns = [
    (re.compile(r'^from\s+core\.'), 'from backend.core.'),
    (re.compile(r'^from\s+database\.'), 'from backend.database.'),
    (re.compile(r'^from\s+middleware\.'), 'from backend.middleware.'),
    (re.compile(r'^from\s+api\.'), 'from backend.api.'),
    (re.compile(r'^from\s+repositories\.'), 'from backend.repositories.'),
    (re.compile(r'^from\s+services\.'), 'from backend.services.'),
    (re.compile(r'^from\s+schemas\.'), 'from backend.schemas.'),
    (re.compile(r'^from\s+models\.'), 'from backend.models.'),
]
updated = 0
for path in base.rglob('*.py'):
    text = path.read_text(encoding='utf-8')
    new_text = text
    for pat, repl in patterns:
        new_text = pat.sub(repl, new_text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        updated += 1
print(f'Updated {updated} backend Python files')
