import ContentLoader from "react-content-loader";

const ButtonSkeleton = () => {
    return (
        <div>
            <ContentLoader viewBox="0 0 350 250"
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
            >
                <circle cx="50%" cy="50%" r="120"/>
            </ContentLoader>
        </div>
    );
};

export default ButtonSkeleton;