//imports
import React, { PureComponent } from "react";
//Styled Components
import { ListItem, Button } from "@ui-kitten/components";

//using pureComponent for optimising the renderItem fn of flatlist
class RenderItem extends PureComponent {
  render() {
    //props from the flatlist
    const { navigate, item } = this.props;
    //to view individual post
    const linkToPost = (item) => (
      <Button
        onPress={() => navigate("Content", { item: item })}
        status="danger"
        size="small"
      >
        View
      </Button>
    );
    
    return (
      <ListItem
        title={`${item.title} ${item.id}`}
        description={item.body}
        accessoryRight={() => linkToPost(item)}
      />
    );
  }
}

export default RenderItem;
