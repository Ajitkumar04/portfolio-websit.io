import re

# Read config-loader.js
with open('assets/js/config-loader.js') as f:
    loader = f.read()

# Read config.js
with open('config.js') as f:
    cfg = f.read()

results = []

# 1. Check config-loader.js no longer has skill-percent or skill-progress
results.append(('skill-percent removed from loader', 'skill-percent' not in loader))
results.append(('skill-progress removed from loader', 'skill-progress' not in loader))
results.append(('skill.level not referenced in loader', 'skill.level' not in loader))

# 2. Check config.js - no 'level' in skills
skills_match = re.search(r'skills:\s*\{(.+?)\n\s*\},', cfg, re.DOTALL)
if skills_match:
    skills_section = skills_match.group(1)
    results.append(('No level property in config.js skills', 'level' not in skills_section))

# 3. Check that skill-name, skill-icon, tech-tag are still in the template
results.append(('skill-name still in template', 'skill-name' in loader))
results.append(('skill-icon still in template', 'skill-icon' in loader))
results.append(('tech-tag still in template', 'tech-tag' in loader))

# 4. Check for undefined%
results.append(('No undefined% in loader', 'undefined%' not in loader))

# 5. Extract skill names from config
if skills_match:
    skill_names = re.findall(r'name:\s*"([^"]+)"', skills_section)
    results.append(('All 25 skill names present', len(skill_names) == 25))

# 6. Extract skill card template and check
template_match = re.search(r'list\.map\(skill => `\s*(.*?)\s*`\)\.join', loader, re.DOTALL)
if template_match:
    template = template_match.group(1)
    results.append(('No undefined% in template', 'undefined%' not in template))
    results.append(('No skill-percent in template', 'skill-percent' not in template))
    results.append(('No skill-progress in template', 'skill-progress' not in template))

print("=" * 60)
print("SKILLS SECTION VERIFICATION RESULTS")
print("=" * 60)
all_pass = True
for desc, passed in results:
    status = "PASS" if passed else "FAIL"
    if not passed:
        all_pass = False
    print(f"  [{status}] {desc}")
print("=" * 60)
if all_pass:
    print("ALL CHECKS PASSED")
else:
    print("SOME CHECKS FAILED")
print("=" * 60)
