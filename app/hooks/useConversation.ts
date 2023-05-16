import { useMemo } from "react";
import { useParams } from "next/navigation";

const useConversation = () => {
    const params = useParams();
    const conversationId = useMemo(() => {
        if (!params?.conversationId) {
            return "";
        }
        return params?.conversationId;
    }, [params?.conversationId]);
    const isOpen = useMemo(() => !!conversationId, []);

    return useMemo(
        () => ({ isOpen, conversationId }),
        [isOpen, conversationId]
    );
};
export default useConversation;
