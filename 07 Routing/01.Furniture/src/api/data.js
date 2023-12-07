import { deleteMethod, getMethod, postMethod } from './api.js';

const endPoints = {
    all: '/data/catalog',
    byId: '/data/catalog/',
    myItems: (currentUserId) => `/data/catalog?where=_ownerId%3D%22${currentUserId}%22`,
    create: '/data/catalog',
    edit: '/data/catalog/',
    delete: '/data/catalog/'
}

export function getAllItems() {
    return getMethod(endPoints.all);
}

export function getOneItemById(id) {
    return getMethod(endPoints.byId + id);
}

export function getMyItems(userId) {
    return getMethod(endPoints.myItems(userId));
}

export function createItem(itemData) {
    return postMethod(endPoints.create, itemData);
}

export function editItem(id, itemData) {
    return postMethod(endPoints.edit + id, itemData);
}

export function deleteItem(id) {
    return deleteMethod(endPoints.delete + id);
}
