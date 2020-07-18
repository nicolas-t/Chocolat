export let timerDebounce = undefined

export function debounce(duration, callback) {
    clearTimeout(timerDebounce)
    timerDebounce = setTimeout(function() {
        callback()
    }, duration)

    return timerDebounce
}

export function transitionAsPromise(triggeringFunc, el) {
    return new Promise((resolve) => {
        const handleTransitionEnd = () => {
            el.removeEventListener('transitionend', handleTransitionEnd)
            resolve()
        }
        el.addEventListener('transitionend', handleTransitionEnd)

        const classesBefore = el.getAttribute('class')
        const stylesBefore = el.getAttribute('style')

        triggeringFunc()

        if (
            classesBefore === el.getAttribute('class') &&
            stylesBefore === el.getAttribute('style')
        ) {
            handleTransitionEnd()
        }
        if (parseFloat(getComputedStyle(el)['transitionDuration']) === 0) {
            handleTransitionEnd()
        }
    })
}

export function loadImage({ src, srcset, sizes }) {
    const image = new Image()

    image.src = src
    if (srcset) {
        image.srcset = srcset
    }
    if (sizes) {
        image.sizes = sizes
    }

    if ('decode' in image) {
        return new Promise((resolve, reject) => {
            image
                .decode()
                .then(() => {
                    resolve(image)
                })
                .catch(() => {
                    reject(image)
                })
        })
    } else {
        return new Promise((resolve, reject) => {
            image.onload = resolve(image)
            image.onerror = reject(image)
        })
    }
}

export function fit(options) {
    let height
    let width

    const {
        imgHeight,
        imgWidth,
        containerHeight,
        containerWidth,
        canvasWidth,
        canvasHeight,
        imageSize,
    } = options

    const canvasRatio = canvasHeight / canvasWidth
    const containerRatio = containerHeight / containerWidth
    const imgRatio = imgHeight / imgWidth

    if (imageSize == 'cover') {
        if (imgRatio < containerRatio) {
            height = containerHeight
            width = height / imgRatio
        } else {
            width = containerWidth
            height = width * imgRatio
        }
    } else if (imageSize == 'native') {
        height = imgHeight
        width = imgWidth
    } else {
        if (imgRatio > canvasRatio) {
            height = canvasHeight
            width = height / imgRatio
        } else {
            width = canvasWidth
            height = width * imgRatio
        }
        if (imageSize === 'scale-down' && (width >= imgWidth || height >= imgHeight)) {
            width = imgWidth
            height = imgHeight
        }
    }

    return {
        height: height,
        width: width,
    }
}

export function openFullScreen(wrapper) {
    if (wrapper.requestFullscreen) {
        return wrapper.requestFullscreen()
    } else if (wrapper.webkitRequestFullscreen) {
        return wrapper.webkitRequestFullscreen()
    } else if (wrapper.msRequestFullscreen) {
        return wrapper.msRequestFullscreen()
    } else {
        return Promise.reject()
    }
}

export function exitFullScreen() {
    if (document.exitFullscreen) {
        return document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
        return document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
        return document.msExitFullscreen()
    } else {
        return Promise.reject()
    }
}
