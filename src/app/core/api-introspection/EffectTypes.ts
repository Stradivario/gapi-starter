
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
export const EffectTypes = strEnum(['findUser',
'login',
'subscribeToUserMessagesBasic',
'subscribeToUserMessagesWithFilter',
'publishSignal',
'deleteUser',
'updateUser',
'addUser']);
export type EffectTypes = keyof typeof EffectTypes;
