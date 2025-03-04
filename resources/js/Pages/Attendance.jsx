const { Head } = require("@inertiajs/react");

const Attendance = ({ attendance }) => {
    return (
        <div>
            <Head title="Attendance" />
            <h1>Attendance</h1>
            <p>{attendance}</p>
        </div>
    );
};

export default Attendance;
