import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <Row style={{ display: "flex", flexDirection: "column" }}>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm></UpdateSettingsForm>
    </Row>
  );
}

export default Settings;
