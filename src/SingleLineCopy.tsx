import { type ClipboardEvent, type FC, type ReactNode } from "react";

interface SingleLineCopyProps {
    children: ReactNode;
}

const SingleLineCopy: FC<SingleLineCopyProps> = ({ children }) => {

    const handleCopy = (event: ClipboardEvent<HTMLDivElement>) => {
        const selection = window.getSelection();

        if (!selection || selection.rangeCount === 0) {
            return;
        }

        const blockTags = new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "DIV", "LI"]);
        let builtString = "";

        const range = selection.getRangeAt(0);
        const fragment = range.cloneContents();

        const processNode = (node: Node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                builtString += node.nodeValue || "";
            }

            else if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;

                if (element.nodeName === "IMG") {
                    builtString += (element as HTMLImageElement).alt;
                } else {
                    element.childNodes.forEach(processNode);

                    if (blockTags.has(element.nodeName)) {
                        builtString += "\n";
                    }
                }
            }
        };

        fragment.childNodes.forEach(processNode);

        const finalString = builtString.trim().replace(/[\n\s]+/g, " ");

        event.preventDefault();
        event.clipboardData.setData("text/plain", finalString);
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center" onCopy={handleCopy}>
            {children}
        </div>
    );
};

export default SingleLineCopy;