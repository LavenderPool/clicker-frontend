import ContentLoader from "react-content-loader";

const RouletteButtonsSkeleton = () => {
    return (
        <div>
            <ContentLoader viewBox="0 0 300 55"
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
            >
                <rect x="0" y="0" rx="8" ry="8" width="300" height="55"/>
            </ContentLoader>
        </div>
    );
};

export default RouletteButtonsSkeleton;