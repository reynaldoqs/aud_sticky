export const toStyleFormat = (value) => {
    if(typeof value === 'number' || typeof value === 'string') return
    //for make more validation and convertions 
    if(typeof value === 'number'){
        return Math.abs(value) + 'px'
    }
    return value
}
export const getSlotElement = (slotRef) => {
    if(!slotRef.children) return
    if(slotRef.children.length === 1) return slotRef.children[0]
}
export const resizeElement = (element, width, height)=>{
    
    if(!element) return
    if(element.tagName === 'VIDEO'){
        element.width = width
        element.height = height
    }
    if(element.tagName === 'DIV'){
        element.style.width = width + 'px'
        element.style.height = height + 'px'
    }
}
export const getTargetPos = (targetPosition, constTargetRect, window, targetPadding) => {
    
    const topPadding = typeof targetPadding === 'number' ? targetPadding : targetPadding[0]
    const leftPadding = typeof targetPadding === 'number' ? targetPadding : targetPadding[1]
    switch (targetPosition) {
        case 'top left':
            return {
                left: leftPadding , top: topPadding
            }
            case 'top right':
                return {
                    left: window.innerWidth - constTargetRect.width - leftPadding, top: topPadding
                }
                case 'bottom left':
                    return {
                        left: leftPadding, top: window.innerHeight - constTargetRect.height - topPadding
                    }
                    case 'bottom right':
                        return {
                            left: window.innerWidth - constTargetRect.width - leftPadding, top:  window.innerHeight - constTargetRect.height - topPadding
                        }
    }
}
export const getScrollElement = (element) =>{
    if(!element) return
    let node = element.parentNode;
            while (
                node &&
                node.tagName !== 'HTML' &&
                node.tagName !== 'BODY' &&
                node.nodeType === 1
            ) {
                if (node.hasAttribute('scroll-control')) {
                    return node;
                }
                node = node.parentNode;
            }
            return element.parentNode;
}