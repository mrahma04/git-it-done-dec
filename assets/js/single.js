var issueContainerEl = document.querySelector('#issues-container')

var getRepoIssues = function (repo) {

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data)
            })
        } else {
            alert('There was a problem with your request!')
        }
    })
}

var displayIssues = function (issues) {

    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!"
        return
    }

    for (let i = 0; i < issues.length; i++) {
        var issuesEl = document.createElement('a')
        issuesEl.classList = "list-item flex-row justify-space-between align-center"
        issuesEl.setAttribute('href', issues[i].html_url)
        issuesEl.setAttribute('target', '_blank')

        var titleEl = document.createElement('span')
        titleEl.textContent = issues[i].title

        issuesEl.append(titleEl)

        var typeEl = document.createElement('span')

        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)"
        } else {
            typeEl.textContent = "(Issues)"
        }

        issuesEl.append(typeEl)

        issueContainerEl.append(issuesEl)
    }
}

getRepoIssues('facebook/react')