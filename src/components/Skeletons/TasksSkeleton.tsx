import ContentLoader from "react-content-loader";

const TasksSkeleton = () => {
    return (
        <div>
            <ContentLoader viewBox="0 0 340 74"
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
            >
                <rect x="0" y="0" rx="20" ry="20" width="340" height="73"/>
            </ContentLoader>
        </div>
    );
};

export default TasksSkeleton;