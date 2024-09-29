if [[ -z $(git status -s) ]]; then
    echo "No changes to commit."
    exit 0
fi

# Show the current status
git status

# Ask for the commit message
echo "Enter your commit message:"
read commit_message

# Add all changes
git add .

# Commit with the provided message
git commit -m "$commit_message"

# Push to the current branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
git push origin $current_branch

echo "Changes pushed to GitHub successfully!"