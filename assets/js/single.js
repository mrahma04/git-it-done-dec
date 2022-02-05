var issueContainerEl = document.querySelector('#issues-container')
var limitWarningEl = document.querySelector('#limit-warning')

var repoNameEl = document.querySelector('#repo-name')

var getRepoName = function() {
    var queryString = document.location.search
    var repoName = queryString.split("=")[1]

    if (repoName) {
        repoNameEl.textContent = repoName
        getRepoIssues(repoName)
    } else {
        document.location.replace('./index.html')
    }
}

var getRepoIssues = function (repo) {

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"

    fetch(apiUrl).then(function (response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data)

                if (response.headers.get("Link")) {
                    displayWarning(repo)
                }
            })
        } else {
            document.location.replace('./index.html')
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

var displayWarning = function (repo) {
    limitWarningEl.textContent = "To see more than 30 issues, visit "

    var linkEl = document.createElement('a')
    linkEl.textContent = "See more issues on GitHub"
    linkEl.setAttribute('href', "https://github.com/" + repo + "/issues")

    limitWarningEl.append(linkEl)
}

getRepoName()