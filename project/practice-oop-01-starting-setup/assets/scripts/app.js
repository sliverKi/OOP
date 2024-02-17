class DOMHelper{ 

    static clearEventListeners(element) { 
        const clonedElement = element.cloneNode(true)
        element.replaceWith(clonedElement)
        return clonedElement
    }
    static moveElement(elementId, newDestinationSelector){ 
        const element = document.getElementById(elementId)
        const destinationElement = document.querySelector(newDestinationSelector)
        destinationElement.append(element)
    }
}

class Component { 
    constructor(hostElemnetId, insertBefore=false) { 
        if (hostElemnetId) {
            this.hostElement = document.getElementById(hostElemnetId);
        } else { 
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore
    }
    detach() { 
        console.log("Component class in detach this", this);
        this.element.remove()
    }
    attach() { 
        this.hostElement.insertAdjacentElement(this.insertBefore ? 'afterbegin': 'beforeend', this.element)  
    }
}
class Tooltip extends Component{ 
    constructor(closeNotifierFunction) { 
        super('active-projects');
        this.closeNotifier = closeNotifierFunction
        this.create();
    }
    closeTooltip  = () => { 
        this.detach();
        this.closeNotifier()
    }
    create() { 
        console.log('The ToolTip')
        const tooltipElement = document.createElement('div')
        tooltipElement.className = 'card' 
        tooltipElement.textContent = 'DUMMY'
        tooltipElement.addEventListener('click', this.closeTooltip)
        this.element = tooltipElement
    }
   
}

class ProjectItem {

    hasActiveTooltip = false
    constructor(id, updatedProjectListsFunction, type) {
        this.id = id;
        this.updatedProjectListsHandler = updatedProjectListsFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
    }
    showMoreInfoHandler() { 
        if (this.hasActiveTooltip) { 
            return;
        }
        const tooltip = new Tooltip(() => { 
            this.hasActiveTooltip=false
        })
        tooltip.attach()
        this.hasActiveTooltip = true
    }
    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id)
        const moreInfoBtn = projectItemElement.querySelector('button:first-of-type')
        moreInfoBtn.addEventListener('click', this.showMoreInfoHandler)
    }
    connectSwitchButton(type) {
        const projectItemElement = document.getElementById(this.id);
        let switchBtn = projectItemElement.querySelector(
            'button:last-of-type',
        );
        switchBtn = DOMHelper.clearEventListeners(switchBtn)
        switchBtn.textContent = type==='active'? 'Finish' : 'Activate'
        switchBtn.addEventListener('click', this.updatedProjectListsHandler.bind(null, this.id));
        console.log(switchBtn);
    }

    update(updateProjectListsFn, type) { 
        this.updatedProjectListsHandler = updateProjectListsFn
        this.connectSwitchButton(type)
    }
}

class ProjectList {
    projects = [];
    constructor(type) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const prjItem of prjItems) {
            //console.log(prjItem.id)
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type));
        }
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }
    addProject(project) {
        this.projects.push(project)
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`)
        //console.log(this)
        project.update(this.switchProject.bind(this), this.type)
    }
    switchProject(projectId) {
        // const projectIndex = this.projects.findIndex(p=>p.id === projectId)
        // this.projects.splice(projectIndex, 1)
        console.log(projectId)
        this.switchHandler(this.projects.find(p => p.id === projectId));
        this.projects = this.projects.filter(p => p.id !== projectId);
    }
}

class App {
    static init() {
        const activeProjectsList = new ProjectList('active');
        const finishedProjectsList = new ProjectList('finished');
        activeProjectsList.setSwitchHandlerFunction(
            finishedProjectsList.addProject.bind(finishedProjectsList),
        );
        finishedProjectsList.setSwitchHandlerFunction(
            activeProjectsList.addProject.bind(activeProjectsList),
        );
    }
}
App.init();
