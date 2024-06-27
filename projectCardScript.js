let currentCardId = null

function showCard(id) {
    if (currentCardId == id) return
    let projectCardList = document.getElementsByClassName('project-card')
    let dotList = document.getElementsByClassName('dot')
    if (id >= projectCardList.length) { id = 0}
    if (id < 0) { id = projectCardList.length - 1 }
    if (currentCardId != null) {
        projectCardList[currentCardId].style.display = 'none'
        dotList[currentCardId].classList.remove('active')
        var videoToPause = projectCardList[currentCardId].firstChild['src']
        projectCardList[currentCardId].firstChild.setAttribute('src', videoToPause)
    }
    projectCardList[id].style.display = 'block'
    dotList[id].classList.add('active')
    currentCardId = id
}

function previousProject() { showCard(currentCardId - 1) }

function nextProject() { showCard(currentCardId + 1) }

function buildDots(nb) {
    let dotContainer = document.createElement('div')
    dotContainer.classList.add('dot-container')

    for (var i = 0; i < nb; i++) {
        let dotItem = document.createElement('span')
        dotItem.classList.add('dot')
        dotItem.setAttribute('onclick', 'showCard(' + i + ')')
        dotContainer.appendChild(dotItem)
    }
    return dotContainer
}

function injectProjectCard() {
    const jsonDataPromise = parseProjectJson()
    jsonDataPromise.then(jsonData => {
        var placeholder = document.getElementById('project-container')
        var projectNb = 0

        var prevButton = document.createElement('a')
        prevButton.classList.add('navigation-button')
        prevButton.setAttribute('id', 'prev-button')
        prevButton.setAttribute('onclick', 'previousProject()')
        prevButton.innerHTML = '❮'
        placeholder.appendChild(prevButton)

        var nextButton = document.createElement('a')
        nextButton.classList.add('navigation-button')
        nextButton.setAttribute('id', 'next-button')
        nextButton.setAttribute('onclick', 'nextProject()')
        nextButton.innerHTML = '❯'
        placeholder.appendChild(nextButton)
        
        for (const id in jsonData) {
            const projectDetails = jsonData[id]
            placeholder.append(buildProjectCard(projectDetails))
            projectNb++
        }
        placeholder.append(buildDots(projectNb))
        showCard(0)
    })
}

async function parseProjectJson() {
    return fetch('./resources/projects.json')
        .then(response => response.json())
        .then(data => { return data })
        .catch(error => console.error('Error loading projects JSON', error))
}

function buildProjectCard(cardData) {
    var projectCardDiv = document.createElement('div')
    projectCardDiv.classList.add('project-card')
    var banner = document.createElement('iframe')
    banner.classList.add('banner')
    /*
    <iframe width="1478" height="542" src="" title="Tales Of The Apocalypse - FIG" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    */
    banner.setAttribute('width', '1478')
    banner.setAttribute('height', '542')
    banner.setAttribute('frameborder', '0')
    banner.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin')
    banner.setAttribute('allowfullscreen', "")
    banner.setAttribute('src', cardData['banner']['url'])

    var title = document.createElement('h3')
    title.classList.add('project-title')
    title.innerHTML = cardData['title']

    var descriptionContainer = document.createElement('div')
    descriptionContainer.classList.add('description-container')
    var description = document.createElement('p')
    description.classList.add('project-description')
    description.innerHTML = cardData['text']
    descriptionContainer.appendChild(description)

    projectCardDiv.appendChild(banner)
    projectCardDiv.appendChild(title)
    projectCardDiv.appendChild(descriptionContainer)

    return projectCardDiv
}

document.addEventListener("DOMContentLoaded", () => {
    injectProjectCard()
})