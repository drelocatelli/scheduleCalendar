function SortColor() {
    const colors = ['#009688', '#8BC34A', '#00BCD4', '#E91E63', '#FF5722', '#673AB7'];
    const chooseColor = Math.floor(Math.random() * ((colors.length - 1) - 0) + 0);

    return colors[chooseColor];
}

export {SortColor};