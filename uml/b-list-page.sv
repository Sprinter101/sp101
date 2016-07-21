@startuml

title SV-43 b-list-page

iPage <|-- bListPage
bListPage o-- bHeader
bListPage *-- bUserBlock
bListPage *-- gListTab
bListPage "2" *-- bCardList
bListPage --> iRouter
bListPage --> iRequest
bListPage --> iUserService

bHeader *-- gIcon
bHeader *-- gButton
bHeader --> iRouter
bHeader --> iRequest

bUserBlock *-- gButton

bCardList "0..*" *-- bCard

iUserService --> iRequest

class bCardList <extend iControl> {
    renderCards()
}

class iUserService {
    isUserLoggedIn()
    removeEntity()
    addEntity()
}

class gListTab <extend cl.gTab> {
    getContentTabs()
    setActiveTab()
    resizeActiveTab()
    createIcon()
}

class bHeader <extend iControl> {
    renderCorrectTitle()
    renderCorrectHelp()
    renderButton()
}

class iRouter <extend cl.iRouter> {
    enable()
    use()
    changeLocation()
    getMaskByUrl()
    parseMaskDataFromUrl()
}

class iUserService {
    isUserLoggedIn()
}

class bUserBlock <extend iControl>
class gButton <extend cl.gButton>
class iPage  <extend iControl>


class iRequest <<clobl class>>
class gIcon <<clobl class>>

@enduml