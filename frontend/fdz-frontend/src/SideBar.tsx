export const SideBar = ({ components }: { components: [JSX.Element] }) => (
    <div id="SideBar">
        <h2> SideBar </h2>
        {components.map((c) => c)}
    </div>
);
