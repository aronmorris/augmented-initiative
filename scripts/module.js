Hooks.once('ready', async function () {
    console.log("Augmented Initiative | Ready!")
});

Hooks.on("updateActor", async () => {
    ui.combat.render();
})

Hooks.on("renderCombatTracker", async (app, html) => {
    if (!game.user?.isGM) return;

    let combatantsDOM = html[0].querySelectorAll("li.combatant");
    combatantsDOM.forEach(el => {
        const actorData = getCombatantActorData(el.dataset.combatantId);
        el.querySelector("div.token-initiative").before(
            $.parseHTML(getReadyHtml(
                actorData.hp,
                actorData.structure,
                actorData.heat,
                actorData.stress)
            )[0]
        );
    });
});

function getCombatantActorData(combatantId) {
    return game.combat.combatants.get(combatantId).actor.data.data;
}

function getReadyHtml(hp, structure, heat, stress) {
    console.log("AUGMENTED | Getting HTML");
    let html = `<div class="token-stats flex-center">`;
    if (typeof hp !== 'undefined') {
        html += (`<div class="token-stats-hp">
            <i class="token-stats-icon mdi mdi-heart-outline"></i>
            <span class="token-stats-text">${hp}</span>
        </div>`);
    }
    if (typeof structure !== 'undefined') {
        html += (`<div class="token-stats-structure">
                    <i class="token-stats-icon cci cci-structure"></i>
                    <span class="token-stats-text">${structure}</span>
                </div>`);
    }
    if (typeof heat !== 'undefined') {
        html += (`<div class="token-stats-heat">
                <i class="token-stats-icon cci cci-heat"></i>
                    <span class="token-stats-text">${heat}</span>
                </div>`)
    }
    if (typeof stress !== 'undefined') {
        html += (`<div class="token-stats-stress">
                <i class="token-stats-icon cci cci-reactor"></i>
                    <span class="token-stats-text">${stress}</span>
                </div>`)
    }
    html += (`</div>`);

    return html;
}