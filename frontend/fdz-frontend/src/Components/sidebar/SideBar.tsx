export const SideBar = ({ components }: { components: JSX.Element[] }) => (
    <div id="SideBar">
        <h2> Z-Garden </h2>
        <ul>
            {components.map((c, i) => (
                <li key={i}>{c}</li>
            ))}
        </ul>
    </div>
);
