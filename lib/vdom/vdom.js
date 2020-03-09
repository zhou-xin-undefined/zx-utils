class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
  }
  render() {
    const dom = document.createElement(this.tagName);
    // 设置标签属性值
    Reflect.ownKeys(this.props).forEach(name =>
      dom.setAttribute(name, this.props[name])
    );

    // 递归更新子节点
    this.children.forEach(child => {
      const childDom =
        child instanceof Element ?
        child.render() :
        document.createTextNode(child);
      dom.appendChild(childDom);
    });

    return dom;
  }
}
export const el = (tagName, props, children) => {
  return new Element(tagName, props, children);
}
/**
 * 节点变化状态常量
 */
const CHANGE_TYPE_TEXT = Symbol("text"); // 新旧节点都是文本，内容发生改变
const CHANGE_TYPE_PROP = Symbol("props"); // 节点的属性值发生变化 
const CHANGE_TYPE_REPLACE = Symbol("replace"); // 节点类型发生变化：文本变成 vdom；vdom 变成文本
/**
 * 更新dom树
 * @param {HTMLElement} $parent
 * @param {Element} newNode
 * @param {Element} oldNode
 * @param {Number} index
 */
export const updateEl = ($parent, newNode, oldNode, index = 0) => {
  let changeType = null;

  if (!oldNode) {
    // 新增节点：如果 oldNode 为 undefined，说明 newNode 是一个新增的 DOM 节点。
    $parent.appendChild(newNode.render());
  } else if (!newNode) {
    // 删除节点：如果 newNode 为 undefined，说明新的 VDom 树中，当前位置没有节点，因此需要将其从实际的 DOM 中删除。
    $parent.removeChild($parent.childNodes[index]);
  } else if ((changeType = checkChangeType(newNode, oldNode))) {
    // 根据checkChangeType返回的变化类型，做对应的处理。如果类型为空，则不进行处理
    if (changeType === CHANGE_TYPE_TEXT) {
      $parent.replaceChild(
        document.createTextNode(newNode),
        $parent.childNodes[index]
      );
    } else if (changeType === CHANGE_TYPE_REPLACE) {
      $parent.replaceChild(newNode.render(), $parent.childNodes[index]);
    } else if (changeType === CHANGE_TYPE_PROP) {
      replaceAttribute($parent.childNodes[index], oldNode.props, newNode.props);
    }
  } else if (newNode.tagName) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; ++i) {
      updateEl(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}
// 封装replaceAttribute，将新 vdom 的属性直接映射到 dom 结构上：
export const replaceAttribute = ($node, removedAttrs, newAttrs) => {
  if (!$node) {
    return;
  }
  Reflect.ownKeys(removedAttrs).forEach(attr => $node.removeAttribute(attr));
  Reflect.ownKeys(newAttrs).forEach(attr =>
    $node.setAttribute(attr, newAttrs[attr])
  );
}
// 编写checkChangeType函数判断变化的类型；如果没有变化，则返回空：
export const checkChangeType = (newNode, oldNode) => {
  if (
    typeof newNode !== typeof oldNode ||
    newNode.tagName !== oldNode.tagName
  ) {
    return CHANGE_TYPE_REPLACE;
  }

  if (typeof newNode === "string") {
    if (newNode !== oldNode) {
      return CHANGE_TYPE_TEXT;
    }
    return;
  }

  const propsChanged = Reflect.ownKeys(newNode.props).reduce(
    (prev, name) => prev || oldNode.props[name] !== newNode.props[name],
    false
  );

  if (propsChanged) {
    return CHANGE_TYPE_PROP;
  }
  return;
}