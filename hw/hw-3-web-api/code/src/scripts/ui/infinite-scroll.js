export const renderLoadingIndicator = () => {
    const loadingElement = document.createElement('div');
    
    loadingElement.className = 'loading-indicator';
    loadingElement.id = 'loading-indicator';
    loadingElement.innerHTML = `<div class="loading-spinner"></div>`;
    
    return loadingElement;
};

export const renderSentinel = () => {
    const sentinel = document.createElement('div');

    sentinel.className = 'sentinel';
    sentinel.id = 'sentinel';
    sentinel.style.height = '1px';
    sentinel.style.visibility = 'hidden';

    return sentinel;
};
