import test from 'ava';
import gitlab from '../lib/gitlab';

test('Push', t => {
  process.env.GITLAB_CI = 'true';
  process.env.CI_COMMIT_SHA = '5678';
  process.env.CI_JOB_NAME = 'job_name';
  process.env.CI_JOB_STAGE = '1234';
  process.env.CI_PIPELINE_ID = '91011';
  process.env.CI_JOB_ID = '1213';
  process.env.CI_PROJECT_URL = 'https://gitlab.com/owner/repo';
  process.env.CI_COMMIT_REF_NAME = 'master';
  process.env.CI_PROJECT_PATH = 'owner/repo';
  process.env.CI_PROJECT_DIR = '/';

  t.deepEqual(gitlab.configuration(), {
    service: 'gitlab',
    commit: '5678',
    build: 'job_name',
    buildUrl: 'https://gitlab.com/owner/repo/pipelines/91011',
    branch: 'master',
    root: '/',
    job: '1234',
    jobUrl: 'https://gitlab.com/owner/repo/-/jobs/1213',
    slug: 'owner/repo',
  });
});
