import React from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import API_SERVICE from 'client/src/services/api-service';

interface parentProps {
    retrieveTagsList: Function,
    preTags: Array<object>,
    randomNumber: number
}
export class EditableTagGroup extends React.Component<parentProps, {}> {
    state = {
        tags: [],
        tagObj: this.props.preTags || [],
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
    };

    componentDidMount(): void {
        this.setTags();
    }

    componentDidUpdate(prevProps: Readonly<parentProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.randomNumber !== this.props.randomNumber){
            this.setTags();
        }
    }

    setTags = () => {
        let tagObj = this.props.preTags;
        let tags = tagObj.map((item) => {
            return item.code;
        });
        this.setState({tags}, this.passTagsToParent);
    };

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags }, this.passTagsToParent);
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        }, this.passTagsToParent);
    };

    handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value });
    };

    handleEditInputConfirm = () => {
        this.setState(({ tags, editInputIndex, editInputValue }) => {
            const newTags = [...tags];
            newTags[editInputIndex] = editInputValue;

            return {
                tags: newTags,
                editInputIndex: -1,
                editInputValue: '',
            };
        }, this.passTagsToParent);
    };

    saveInputRef = input => {
        this.input = input;
    };

    saveEditInputRef = input => {
        this.editInput = input;
    };

    passTagsToParent = () => {
        this.props.retrieveTagsList(this.state.tags);
    }

    addSICCode = () => {
        /*API_SERVICE.addSICCode(details.id, reqObj).then((d) => {
            onClose(true);
        }).catch((e) => {
            notification.error({ message: API_SERVICE.handleErrors(e) });
        }).finally(() => {
            setSaving(false);
        });*/
    }

    render() {
        const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
        return (
            <>
                {tags.map((tag, index) => {
                    if (editInputIndex === index) {
                        return (
                            <Input
                                ref={this.saveEditInputRef}
                                key={tag}
                                size="small"
                                className="tag-input"
                                value={editInputValue}
                                onChange={this.handleEditInputChange}
                                onBlur={this.handleEditInputConfirm}
                                onPressEnter={this.handleEditInputConfirm}
                            />
                        );
                    }

                    const isLongTag = tag?.length > 20;

                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={tag}
                            closable={true}
                            onClose={() => this.handleClose(tag)}
                        >
              <span
                  onDoubleClick={e => {
                      this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                          this.editInput.focus();
                      });
                      e.preventDefault();
                  }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        className="tag-input"
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={this.showInput}>
                        <PlusOutlined /> New Tag
                    </Tag>
                )}
            </>
        );
    }
}
