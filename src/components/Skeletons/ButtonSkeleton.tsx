import ContentLoader from "react-content-loader";

const ButtonSkeleton = () => {
    return (
        <div>
            <ContentLoader viewBox="0 0 344 200"
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)">
                <circle cx="50%" cy="50%" r="100"/>
            </ContentLoader>
        </div>
    );
};

export default ButtonSkeleton;