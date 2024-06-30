import ContentLoader from "react-content-loader";

const BoosterItemsSkeleton = () => {
    return (
        <div>
            <ContentLoader viewBox="0 0 340 112"
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
            >
                <rect x="0" y="0" rx="20" ry="20" width="340" height="112"/>
            </ContentLoader>
            <ContentLoader viewBox="0 0 340 112"
                           style={{marginTop: '20px'}}
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
            >
                <rect x="0" y="0" rx="20" ry="20" width="340" height="112"/>
            </ContentLoader>
        </div>
    );
};

export default BoosterItemsSkeleton;