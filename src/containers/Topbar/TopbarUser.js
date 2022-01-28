import React from 'react';
import Popover from '@iso/components/shared/template/uielements//popover';
import userpic from '@iso/assets/images/user.png';


export default function TopbarUser() {
  const [visible, setVisibility] = React.useState(false);

  return (
    <Popover
      visible={visible}
      placement="bottomLeft"
    >
      <div className="isoImgWrapper">
        <img alt="user" src={userpic} />
        <span className="userActivity online" />
      </div>
    </Popover>
  );
}
