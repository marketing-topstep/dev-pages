---
layout: post
title: "Publishing Processes"
---

# GIT command-line instructions for publishing a branch to dev, staging, and prod environments

---

After setting up GIT locally and adding remote origin, use these steps for creating a branch and publishing edits to the various environments.

## Create new branch from 'main'

Pull updates from repository:

```bash
git switch main
git pull origin main
```

These commands:
- Switch to the main branch  
- Pull branch from origin to update 

---

## Create new branch and make new edits locally

Create a branch and run dev locally. Make any edits on this branch and commit changes when finished.

```bash
git checkout -b new-branch-name
```

This command:
- Creates a new branch named "new-branch-name"

```bash
npm run storybook
npm run dev
```

These commands:
- Runs Storybook locally for component previewing and development
- Runs the site locally for development

After edits are completed, add files to GIT and commit the changes to the branch.

First, double check to make sure you are on the correct branch:

```bash
git status
```

Then:

```bash
git status
git add .
git commit -m "Message for commit"
```

These commands:
- Adds all edited files to the commit log
- Commits the edits to the current branch

Now the branch is ready to push or merge.


---

## Publishing to dev (merge)

To publish to dev, the branch just needs to be merged with the "dev" branch. The dev project workflow is set up to publish any time edits are pushed to the dev branch (GitHub Actions). The process usually takes 5-10 minutes to complete once merged.

First, once again, switch to the main branch and pull any updates from the remote origin:

```bash
git switch main
git pull origin main
```

Then switch to the dev branch and merge the new branch into it. Then push dev to the remote origin to run the workflow:

```bash
git switch dev
git merge --no-ff new-branch-name -m "Merge branch-name into dev"
git push origin dev
```

These commands:
- Switch to the dev branch
- Merges edits from new-branch-name
- pushes the updated dev branch to the remote origin

### Why use `--no-ff`?

- Preserves branch history
- Makes feature merges clearly visible in the commit log
- Cleaner for release tracking
- Common in team workflows

---

## Publishing to staging

To publish to staging, the new branch must be pushed to the remote origin and have a Pull Request added. Once the Pull Request is merged with the main branch, the staging publish workflow will be triggered.

Switch to the new branch or confirm that your are currently on it:

```bash
git switch new-branch-name
git status
git push origin new-branch-name
```

Once the branch has been uploaded to the remote repository, navigate to Github and follow the steps to create and merge a pull request...

---

## Publishing to prod

Use the Marketing CI workflow to publish main branch to prod:

Branch: main
Deployment environment: prod

Run Workflow

* workflows can be cancelled in process once they begin running