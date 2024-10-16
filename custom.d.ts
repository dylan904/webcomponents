declare module '*.css?inline' {
    import { CSSResultGroup } from 'lit';
    const content: CSSResultGroup;
    export default content;
}

declare module '*props.js' {
    const content: object;
    export default content;
}