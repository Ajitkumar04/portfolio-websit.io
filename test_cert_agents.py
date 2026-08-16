import os, re, urllib.request, json

base = r'C:\Users\a\OneDrive\Desktop\portflio website'
url_base = 'http://localhost:8080'

print('=' * 60)
print('CERTIFICATE AGENTS - COMPREHENSIVE TEST')
print('=' * 60)

# 1. Check all JS files are accessible
print('\n--- 1. JavaScript File Accessibility ---')
js_files = [
    'config.js',
    'assets/js/config-loader.js',
    'assets/js/cert-data-manager.js',
    'assets/js/cert-renderer.js',
    'assets/js/cert-upload-manager.js',
    'assets/js/cert-edit-manager.js',
    'assets/js/main.js',
    'assets/js/theme.js',
    'assets/js/typing.js',
    'assets/js/filter.js',
    'assets/js/contact.js',
]
for jf in js_files:
    try:
        req = urllib.request.urlopen(url_base + '/' + jf, timeout=5)
        status = req.getcode()
        size = len(req.read())
        print(f'  {jf}: HTTP {status}, {size} bytes')
    except Exception as e:
        print(f'  {jf}: ERROR - {e}')

# 2. Check certificate image is accessible
print('\n--- 2. Certificate Image Accessibility ---')
img_path = 'assets/images/huggingface-llm-certificate.png'
try:
    req = urllib.request.urlopen(url_base + '/' + img_path, timeout=5)
    status = req.getcode()
    content_type = req.headers.get('Content-Type', '')
    size = len(req.read())
    print(f'  {img_path}: HTTP {status}, Content-Type: {content_type}, {size} bytes')
except Exception as e:
    print(f'  {img_path}: ERROR - {e}')

# 3. Check all image references in config.js
print('\n--- 3. All Image References in config.js ---')
with open(os.path.join(base, 'config.js'), 'r') as f:
    config_content = f.read()

image_refs = re.findall(r'image:\s*"([^"]+)"', config_content)
for ref in image_refs:
    rel = ref[2:] if ref.startswith('./') else ref
    abs_path = os.path.join(base, rel)
    exists = os.path.exists(abs_path)
    size = os.path.getsize(abs_path) if exists else 0
    print(f'  {ref} -> exists={exists}, size={size} bytes')

# 4. Check profile image
print('\n--- 4. Profile Image ---')
profile_ref = re.search(r'profileImage:\s*"([^"]+)"', config_content)
if profile_ref:
    ref = profile_ref.group(1)
    rel = ref[2:] if ref.startswith('./') else ref
    abs_path = os.path.join(base, rel)
    exists = os.path.exists(abs_path)
    size = os.path.getsize(abs_path) if exists else 0
    print(f'  {ref} -> exists={exists}, size={size} bytes')

# 5. Check certifications data
print('\n--- 5. Certifications Data ---')
cert_match = re.search(r'certifications:\s*\[(.*?)\]', config_content, re.DOTALL)
if cert_match:
    cert_block = cert_match.group(1)
    titles = re.findall(r'title:\s*"([^"]+)"', cert_block)
    issuers = re.findall(r'issuer:\s*"([^"]+)"', cert_block)
    dates = re.findall(r'date:\s*"([^"]+)"', cert_block)
    images = re.findall(r'image:\s*"([^"]+)"', cert_block)
    verify_urls = re.findall(r'verifyUrl:\s*"([^"]+)"', cert_block)
    credential_ids = re.findall(r'credentialId:\s*"([^"]+)"', cert_block)

    for i in range(len(titles)):
        print(f'  Cert {i+1}:')
        print(f'    title: {titles[i]}')
        print(f'    issuer: {issuers[i]}')
        print(f'    date: {dates[i]}')
        if i < len(images):
            print(f'    image: {images[i]}')
        if i < len(verify_urls):
            print(f'    verifyUrl: {verify_urls[i]}')
        if i < len(credential_ids):
            print(f'    credentialId: {credential_ids[i]}')

# 6. Check for fake certificates
print('\n--- 6. Checking for Fake/Placeholder Certificates ---')
fake_certs = ['Google Cloud Professional ML Engineer', 'AWS Certified Machine Learning', 'DeepLearning.AI']
for fake in fake_certs:
    present = fake in config_content
    print(f'  "{fake}" present: {present}')

# 7. Check JS syntax (balanced braces/parens/brackets)
print('\n--- 7. JS Syntax Validation ---')
for filepath in [
    os.path.join(base, 'config.js'),
    os.path.join(base, 'assets', 'js', 'config-loader.js'),
    os.path.join(base, 'assets', 'js', 'cert-data-manager.js'),
    os.path.join(base, 'assets', 'js', 'cert-renderer.js'),
    os.path.join(base, 'assets', 'js', 'cert-upload-manager.js'),
    os.path.join(base, 'assets', 'js', 'cert-edit-manager.js'),
]:
    with open(filepath, 'r') as f:
        content = f.read()

    # Remove strings and comments
    content_clean = re.sub(r'//.*?$', '', content, flags=re.MULTILINE)
    content_clean = re.sub(r'/\*.*?\*/', '', content_clean, flags=re.DOTALL)
    content_clean = re.sub(r'"(?:[^"\\]|\\.)*"', '""', content_clean)
    content_clean = re.sub(r"'(?:[^'\\]|\\.)*'", '""', content_clean)
    content_clean = re.sub(r'`(?:[^`\\]|\\.)*`', '""', content_clean)

    braces = content_clean.count('{') - content_clean.count('}')
    parens = content_clean.count('(') - content_clean.count(')')
    brackets = content_clean.count('[') - content_clean.count(']')

    filename = os.path.basename(filepath)
    balanced = braces == 0 and parens == 0 and brackets == 0
    print(f'  {filename}: braces={braces}, parens={parens}, brackets={brackets} -> {"BALANCED" if balanced else "UNBALANCED"}')

# 8. Check CSS for stray markers
print('\n--- 8. CSS Validation ---')
css_path = os.path.join(base, 'assets', 'css', 'style.css')
with open(css_path, 'r') as f:
    css_content = f.read()

stray_markers = css_content.count('>>>>>>>')
print(f'  Stray diff markers: {stray_markers}')
has_cert_preview = '.cert-preview-img' in css_content
print(f'  .cert-preview-img class present: {has_cert_preview}')
has_cert_modal = '.cert-management-modal' in css_content
print(f'  .cert-management-modal class present: {has_cert_modal}')

# 9. Check index.html for new scripts and modal
print('\n--- 9. index.html Verification ---')
with open(os.path.join(base, 'index.html'), 'r') as f:
    html_content = f.read()

scripts_to_check = [
    'cert-data-manager.js',
    'cert-renderer.js',
    'cert-upload-manager.js',
    'cert-edit-manager.js',
]
for script in scripts_to_check:
    present = script in html_content
    print(f'  Script {script}: {"present" if present else "MISSING"}')

has_manage_btn = 'cert-manage-btn' in html_content
print(f'  Manage Certificates button: {"present" if has_manage_btn else "MISSING"}')

has_modal = 'cert-management-modal' in html_content
print(f'  Management modal: {"present" if has_modal else "MISSING"}')

has_cert_grid = 'certifications-grid' in html_content
print(f'  Certifications grid: {"present" if has_cert_grid else "MISSING"}')

# 10. Check config-loader.js no longer has certifications renderer
print('\n--- 10. config-loader.js Verification ---')
with open(os.path.join(base, 'assets', 'js', 'config-loader.js'), 'r') as f:
    loader_content = f.read()

has_cert_renderer = 'CERTIFICATIONS RENDERER' in loader_content
has_cert_card = 'cert-card' in loader_content
print(f'  Has CERTIFICATIONS RENDERER comment: {has_cert_renderer}')
print(f'  Has cert-card rendering: {has_cert_card}')

# 11. Check for hero-bg.jpg references (pre-existing issue)
print('\n--- 11. Pre-existing Image References ---')
hero_bg_refs = config_content.count('hero-bg.jpg')
print(f'  hero-bg.jpg references in config.js: {hero_bg_refs}')
hero_bg_exists = os.path.exists(os.path.join(base, 'assets', 'images', 'hero-bg.jpg'))
print(f'  hero-bg.jpg exists: {hero_bg_exists}')

print('\n' + '=' * 60)
print('TEST COMPLETE')
print('=' * 60)
