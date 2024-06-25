import ContentLoader from "react-content-loader";

const ShopListSkeleton = () => {
    return (
        <div>
            <ContentLoader viewBox="0 0 510 236"
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
            >
                <rect x="0" y="0" rx="20" ry="20" width="245" height="98"/>
                <rect x="265" y="0" rx="20" ry="20" width="245" height="98"/>

                <rect x="0" y="118" rx="20" ry="20" width="245" height="98"/>
                <rect x="265" y="118" rx="20" ry="20" width="245" height="98"/>
            </ContentLoader>
        </div>
    );
};

export default ShopListSkeleton;