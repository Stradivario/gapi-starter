export const ApplyServicesHook = (self, options) => {
    
    options.imports.forEach(i => {
        Object.assign(self, { [i.name]: new i() })
    });
    Object.assign(self, { start: () => { console.log('started') } });
}