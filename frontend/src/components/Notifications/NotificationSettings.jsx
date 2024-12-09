import React, { useState } from "react";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <h2>Notification Settings</h2>
      <label>
        <input
          type="checkbox"
          checked={settings.email}
          onChange={() => toggleSetting("email")}
        />
        Email Notifications
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.sms}
          onChange={() => toggleSetting("sms")}
        />
        SMS Notifications
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.push}
          onChange={() => toggleSetting("push")}
        />
        Push Notifications
      </label>
    </div>
  );
};

export default NotificationSettings;
