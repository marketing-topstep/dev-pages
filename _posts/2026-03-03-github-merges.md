---
layout: post
title: "Github Pages"
---

[https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github)

# Adding a Commit Message When Using `git merge`

---

## ✅ Basic Syntax

```bash
git merge branch-name -m "Merge branch-name into dev"
```

This command:

- Performs the merge  
- Uses your provided commit message  
- Skips opening the default editor (like Vim)  

---

## 📝 Multi-line Commit Message

You can include a commit body by stacking multiple `-m` flags:

```bash
git merge branch-name \
  -m "Merge branch-name into dev" \
  -m "Adds new banner component, styles, and CMS schema updates."
```

- The first `-m` becomes the **commit title**
- The second `-m` becomes the **commit body**

---

## ⚠ Important Notes

- The `-m` flag only applies if Git creates a **merge commit**.
- If the merge is a **fast-forward**, Git will not create a merge commit — so no message will be used.

If you want to **force a merge commit** (even when fast-forward is possible), use:

```bash
git merge --no-ff branch-name -m "Merge branch-name into dev"
```

### Why use `--no-ff`?

- Preserves branch history
- Makes feature merges clearly visible in the commit log
- Cleaner for release tracking
- Common in team workflows

---

## 🚀 Example: Standard Team Workflow

```bash
git checkout dev
git pull origin dev
git merge --no-ff branch-name -m "Merge branch-name into dev"
git push origin dev
```

This ensures:

1. `dev` is up to date
2. The merge creates a visible merge commit
3. The updated branch is pushed to remote

---

If you'd like, you can also explore:

- Using `--squash` merges
- Rebasing instead of merging
- Best practices for CI/CD pipelines