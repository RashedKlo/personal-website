import { memo } from "react";

const OptimizedImage = memo(({ src, alt, className, ...props }) => (
    <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        {...props}
    />
));
export default OptimizedImage;