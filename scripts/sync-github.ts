import { execSync } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync, mkdtempSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const USERNAME = 'Chen-YiY';
const DATA_PATH = resolve(__dirname, '../src/data/github-cache.json');
const PYTHON = 'D:/Python/Anaconda_envs/envs/data_analysis_pratice/python.exe';

const PYTHON_SCRIPT = `
import urllib.request, json, sys
sys.stdout.reconfigure(encoding='utf-8')
url = sys.argv[1]
req = urllib.request.Request(url, headers={'User-Agent': 'portfolio-sync'})
resp = urllib.request.urlopen(req)
data = json.loads(resp.read())
result = []
for r in data:
    result.append({
        'name': r['name'],
        'description': r.get('description', ''),
        'html_url': r['html_url'],
        'homepage': r.get('homepage', '') or '',
        'language': r.get('language', '') or '',
        'stargazers_count': r['stargazers_count'],
        'forks_count': r['forks_count'],
        'topics': r.get('topics', []),
        'updated_at': r['updated_at'],
        'created_at': r['created_at'],
        'fork': r['fork'],
        'archived': r.get('archived', False),
    })
print(json.dumps(result, ensure_ascii=False))
`;

async function fetchRepos() {
  const tmpDir = mkdtempSync(join(tmpdir(), 'sync-github-'));
  const scriptPath = join(tmpDir, 'fetch_repos.py');

  writeFileSync(scriptPath, PYTHON_SCRIPT, 'utf-8');

  try {
    const url = `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`;
    const result = execSync(
      `${PYTHON} "${scriptPath}" "${url}"`,
      { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
    );
    return JSON.parse(result.trim());
  } finally {
    unlinkSync(scriptPath);
  }
}

async function main() {
  console.log('Fetching GitHub repos for', USERNAME);
  const repos = await fetchRepos();

  const supplementalRaw = readFileSync(
    resolve(__dirname, '../src/data/projects.json'),
    'utf-8'
  );
  const supplemental = JSON.parse(supplementalRaw);

  const merged = repos.map((repo: any) => {
    const extra = supplemental.projects.find((p: any) => p.name === repo.name);
    return {
      ...repo,
      ...(extra
        ? {
            featured: extra.featured ?? false,
            customDescription: extra.customDescription,
            customTags: extra.customTags,
            platform: extra.platform,
          }
        : { featured: false }),
    };
  });

  writeFileSync(DATA_PATH, JSON.stringify(merged, null, 2), 'utf-8');
  console.log(`Cached ${merged.length} repos to ${DATA_PATH}`);
}

main().catch(console.error);
