const spaceBlocks = document.getElementsByClassName('space-block');

const addHue = (element) => {
    element.style.backgroundColor = '#000';
    element.style.mixBlendMode = 'hue';
};

const removeHue = (element) => {
    element.style.removeProperty('background-color');
    element.style.removeProperty('mix-blend-mode');
};

const addLight = (element) => {
    element.style.backgroundColor = 'rgb(255, 255, 255, 0.3)';

};

const removeLight = (element) => {
    element.style.removeProperty('background-color');
};

const addGreyToBlock = (targetBlock) => {
    const hueElement = targetBlock.getElementsByClassName('block-hue')[0];
    const ligherElement = targetBlock.getElementsByClassName('block-lighter')[0];

    addHue(hueElement);
    addLight(ligherElement);
};

const removeGreyFromBlock = (targetBlock) => {
    const hueElement = targetBlock.getElementsByClassName('block-hue')[0];
    const ligherElement = targetBlock.getElementsByClassName('block-lighter')[0];

    removeHue(hueElement);
    removeLight(ligherElement);
};

const createMask = () => {
    const mask = document.createElement('div');

    mask.id = 'focus-mask';

    mask.style.position = 'fixed';
    mask.style.top = 0;
    mask.style.left = 0;
    mask.style.zIndex = 5;

    mask.style.width = '100vw';
    mask.style.height = '100vh';

    mask.style.backgroundColor = 'rgb(0, 0, 0, 0.5)';

    mask.style.pointerEvents = 'none';

    return mask;
};

const createImageOverlay = (element) => {
    const overlay = document.createElement('div');
    const style = window.getComputedStyle(element);

    overlay.id = 'focus-overlay';

    overlay.style.position = 'fixed';
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';

    overlay.style.backgroundSize = 'contain';
    overlay.style.backgroundImage = style.getPropertyValue('background-image');
    overlay.style.backgroundRepeat = 'no-repeat';
    overlay.style.backgroundPosition = 'center';

    overlay.style.pointerEvents = 'none';

    overlay.style.width = '90vw';
    overlay.style.height = '80vh';

    overlay.style.zIndex = 10;

    return overlay;
};

const focusElement = (element) => {
    const mask = createMask();
    const overlay = createImageOverlay(element);

    mask.appendChild(overlay);

    document.getElementsByTagName('body')[0].appendChild(mask);
};

const unfocusElement = () => {
    document.getElementById('focus-mask').remove();
};

const onSpaceBlockMouseOver = (event) => {
    for (const spaceBlock of spaceBlocks) {
        if (spaceBlock.id === event.currentTarget.id) {
            focusElement(spaceBlock);

            continue;
        }

        addGreyToBlock(spaceBlock);
    }
};

const onSpaceBlockMouseLeave = (event) => {
    for (const spaceBlock of spaceBlocks) {
        if (spaceBlock.id === event.target.id) {
            unfocusElement(spaceBlock);

            continue;
        }

        removeGreyFromBlock(spaceBlock);
    }
}

for (const spaceBlock of spaceBlocks) {
    spaceBlock.addEventListener('mouseover', onSpaceBlockMouseOver);
    spaceBlock.addEventListener('mouseleave', onSpaceBlockMouseLeave);
}