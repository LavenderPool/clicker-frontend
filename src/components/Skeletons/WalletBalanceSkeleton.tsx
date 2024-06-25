import React from 'react';
import ContentLoader from "react-content-loader";

const WalletBalanceSkeleton = () => {
    return (
        <div style={{margin: 'auto', display:'block'}}>
            <ContentLoader viewBox="0 0 380 43.5"
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
            >
                <rect x="140" y="0" rx="3" ry="3" width="100" height="43.5" />
            </ContentLoader>
        </div>
    );
};

export default WalletBalanceSkeleton;