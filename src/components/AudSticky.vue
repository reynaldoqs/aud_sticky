<template>
<div class="aud-sticky" :style="containerStyles">
    <div ref="element" :class="{'aud-element':true, 'aud-opened': isOpened}" :style="elementStyles">
        <div v-if="isOpened" class="aud-menu aud-hidden">
            <aud-btn-icon @iconClick="isOpened = false"></aud-btn-icon>
        </div>
        <div ref="slot_element">
            <slot />
        </div>
    </div>
</div>
</template>

<script>
import AudBtnIcon from './AudBtnIcon'
import {
    getSlotElement,
    resizeElement,
    getTargetPos,
    getScrollElement
} from '../utils/index'
export default {
    name: 'aud-sticky',
    props: {
        isSticky: {
            type: Boolean,
            default: true
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        isAnimated: {
            type: Boolean,
            default: true
        },
        targetPosition: {
            type: String,
            default: 'bottom left',
            validator(value) {
                return ['top left', 'top right', 'bottom left', 'bottom right'].indexOf(value) !== -1
            }
        },
        targetPadding: {
            type: [Array, Number],
            default: 20,
            validator(value) {
                if (Array.isArray()) {
                    return value.every(x => typeof x === 'number') && value.length === 2
                }
                return true
            }
        },
        targetWidth: {
            type: Number
        },
        targetHeight: {
            type: Number
        },
        offsetTop: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            isOpened: false,
            elementStyles: {},
            constRect: {
                width: null,
                height: null
            },
            constTargetRect: {
                top: null,
                left: null,
                width: null,
                height: null
            }
        }
    },
    computed: {
        containerStyles() {
            return {
                width: this.constRect.width+'px',
                height: this.constRect.height+'px'
            }
        }
    },
    watch: {
        isOpened(value) {
            if (value) {
                this.$nextTick(() => {
                    this.moveElementTo()
                    this.resizeChild()
                })
                this.$emit('onOpen')
            } else {
                this.$nextTick(() => {
                    this.closeElement()
                    this.resetChildSize()
                })
                this.$emit('onClose')
            }
        }
    },
    mounted() {
        this.initConfig()
        this.addScrollListener()
    },
    methods: {
        initConfig() {
            const element = getSlotElement(this.$refs.slot_element)
            const {
                width,
                height
            } = element.getBoundingClientRect()
            this.constRect.width = width
            this.constRect.height = height
            this.constTargetRect.width = this.targetWidth || width
            this.constTargetRect.height = this.targetHeight || height
            const {
                top,
                left
            } = getTargetPos(this.targetPosition, this.constTargetRect, window, this.targetPadding)
            this.constTargetRect.top = top
            this.constTargetRect.left = left
        },
        closeElement() {
            this.$set(this.elementStyles, 'position', 'relative')
            this.$set(this.elementStyles, 'top', null)
            this.$set(this.elementStyles, 'left', null)
            this.$set(this.elementStyles, 'width', this.constRect.width + 'px')
            this.$set(this.elementStyles, 'height', this.constRect.height + 'px')
        },
        resizeChild() {
            if (!this.autoResize) return
            const element = getSlotElement(this.$refs.slot_element)
            //resizeElement(DomElement,number,number)
            resizeElement(element, this.targetWidth, this.targetHeight)
        },
        resetChildSize() {
            if (!this.autoResize) return
            const element = getSlotElement(this.$refs.slot_element)
            //resizeElement(DomElement,number,number)
            resizeElement(element, this.constRect.width, this.constRect.height)
        },
        moveElementTo() {
            const element = this.$refs.element
            if (!element) return
            this.$set(this.elementStyles, 'position', 'fixed')
            const {
                top,
                left,
                width,
                height
            } = element.getBoundingClientRect()
            const {
                top: tTop,
                left: tLeft,
                width: tWidth,
                height: tHeight
            } = this.constTargetRect

            if (element.animate && this.isAnimated) {
                element.animate([{
                        left: left + 'px',
                        top: top + 'px',
                        width: width + 'px',
                        height: height + 'px',
                        opacity: 0
                    },
                    {
                        left: tLeft + 'px',
                        top: tTop + 'px',
                        width: tWidth + 'px',
                        height: tHeight + 'px',
                        opacity: 1
                    },
                ], {
                    duration: 150,
                    easing: 'ease-out',
                    fill: 'none'
                })
            }

            this.$set(this.elementStyles, 'left', tLeft + 'px')
            this.$set(this.elementStyles, 'top', tTop + 'px')
            this.$set(this.elementStyles, 'width', tWidth + 'px')
            this.$set(this.elementStyles, 'height', tHeight + 'px')
        },
        addScrollListener() {
            if (!this.isSticky) return
            let directionControl = 0
            const scrollControl = getScrollElement(this.$el)
            //scrollControl.classList.add('aud-scroller')
            //console.log(scrollControl);
            const scrollHandler = () => {
                const currentScroll = /* scrollEl === window ? scrollEl.scrollY :*/ scrollControl.scrollTop
                if ((currentScroll - this.$el.getBoundingClientRect().height - this.offsetTop) > 0 && isGoingDown(currentScroll)) {
                    this.isOpened = true
                }
                if (currentScroll - this.offsetTop <= 0) {
                    this.isOpened = false
                }
            }
            const isGoingDown = (scroll) => {
                const direction = directionControl < scroll ? true : false
                directionControl = scroll
                return direction
            }
            scrollControl.addEventListener('scroll', scrollHandler)
        },
    
    },
    components: {
        AudBtnIcon
    }
}
</script>

<style>
.aud-sticky {
    background-color: #212121;
    display: inline-block;
     overflow: hidden;
}

.aud-element {
    position: relative;
    overflow: hidden;
    background-color: #212121;
}

.aud-element:hover .aud-hidden {
    display: flex;
}

.aud-menu {
    width: 100px;
    height: 50px;
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    background-image: linear-gradient(30deg, transparent 50%, rgba(0, 0, 0, .6));
    display: flex;
    justify-content: flex-end;
    padding: 4px;
    z-index: 999;
}

.aud-hidden {
    display: none;
}

.aud-opened {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    overflow: hidden;
}
</style>
