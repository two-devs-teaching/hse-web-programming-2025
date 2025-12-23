import { renderLoadingIndicator, renderSentinel } from '../ui';

export class InfiniteScrollManager {
    constructor(onLoadMore, pageSize = 10) {
        this.onLoadMore = onLoadMore;
        this.pageSize = pageSize;
        this.observer = null;
        this.sentinel = null;
        this.loadingIndicator = null;
        this.isLoading = false;
        this.hasMoreData = true;
    }

    init() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                root: null,
                rootMargin: '50px',
                threshold: 0.1
            }
        );
    }

    async handleIntersection(entries) {
        const entry = entries[0];
        
        if (entry.isIntersecting && !this.isLoading && this.hasMoreData) {
            this.isLoading = true;
            this.showLoading();
            
            try {
                const hasMore = await this.onLoadMore();

                this.hasMoreData = hasMore;
                
                if (!hasMore) {
                    this.cleanup();
                }
            } catch (error) {
                console.error('Error loading more todos:', error);
            } finally {
                this.isLoading = false;
                this.hideLoading();
            }
        }
    }

    showLoading() {
        if (!this.loadingIndicator) {
            this.loadingIndicator = renderLoadingIndicator();
        }
        
        if (this.sentinel && this.sentinel.parentNode) {
            this.sentinel.parentNode.insertBefore(this.loadingIndicator, this.sentinel);
        }
    }

    hideLoading() {
        if (this.loadingIndicator && this.loadingIndicator.parentNode) {
            this.loadingIndicator.parentNode.removeChild(this.loadingIndicator);
        }
    }

    attachSentinel(container) {
        if (!this.hasMoreData) {
            return;
        }

        this.sentinel = renderSentinel();

        container.appendChild(this.sentinel);
        
        if (this.observer) {
            this.observer.observe(this.sentinel);
        }
    }

    detachSentinel() {
        if (this.sentinel) {
            if (this.observer) {
                this.observer.unobserve(this.sentinel);
            }
            
            if (this.sentinel.parentNode) {
                this.sentinel.parentNode.removeChild(this.sentinel);
            }
            
            this.sentinel = null;
        }
    }

    cleanup() {
        this.detachSentinel();
        this.hideLoading();
        
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    reset() {
        this.cleanup();

        this.hasMoreData = true;
        this.isLoading = false;
        
        if (this.observer) {
            this.observer.disconnect();
        }
        
        this.init();
    }
}
