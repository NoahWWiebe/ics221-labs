import Table from 'react-bootstrap/Table';

const MessageTable = ({ messages }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Message</th>
                </tr>
            </thead>
            <tbody>
                {messages.map((message, index) => (
                    <tr key={message.id}>
                        <td>{index + 1}</td>
                        <td>{message.name}</td>
                        <td>{message.msgText}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default MessageTable;
