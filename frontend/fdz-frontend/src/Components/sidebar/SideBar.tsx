export const SideBar = ({ components }: { components: JSX.Element[] }) => (
    <div id="SideBar">
        <h2> SideBar </h2>
        <ul>
            {components.map((c) => (
                <li>{c}</li>
            ))}
        </ul>
    </div>
);
