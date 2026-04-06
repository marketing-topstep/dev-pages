---
layout: post
title: "Update Redirects"
---

# Adding or updating redirects in Sanity/Nextjs

---

Redirects are added through Sanity Studio and published via Github Workflow

## Add Redirect in Studio

Add redirect in Studio > Redirects and Publish:

---

## Use update-redirects branch to create PR

In GIT, switch to main branch and pull the most recent code from the remote origin

```bash
git checkout main
git pull origin main
```

Open the next.config file and copy all.

Then checkout the update-redirects branch

```bash
git checkout update-redirects
```
Paste the contents of next.config into the same file in the update-redirects branch to make sure they match.

Add a comment to the bottom of the next.config file to note the redirect added and have an edit to commit to the branch.

Save and commit:

```bash
git add .
git commit -m "Update redirect note"
```

## Push the update-redirects branch to remote and create PR

Push the update-redirects branch to remote

```bash
git push origin update-redirects
```

Next, navigate to Github to create a PR and Merge--this will trigger the Staging workflow--this usually takes 5-10 minutes.

Test redirect in Staging.


## Publishing to Prod

Use the Marketing CI workflow to publish main branch to prod:

Branch: main
Deployment environment: prod

Run Workflow

* workflows can be cancelled in process once they begin running