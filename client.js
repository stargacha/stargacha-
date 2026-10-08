window.__ModuleLoader__.load({
  id: 'dsh-astral-summon',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const PANEL_ID = 'astral-summon'

    function StarIcon({ size }) {
      return h('svg', { viewBox: '0 0 24 24', width: size, height: size, 'aria-hidden': true, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round' },
        h('path', { d: 'M12 2.8l2.3 6.1 6.5.3-5.1 4 1.8 6.3L12 15.9l-5.5 3.6 1.8-6.3-5.1-4 6.5-.3z' }))
    }

    // The whole game, including character chat, lives in this page. No agent presets are
    // registered, so characters can only be reached by owning their card in the game.
    function AstralPage() {
      return h('div', { style: { width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', background: '#07051a' } },
        h('iframe', { src: '/astral-summon/index.html', title: '星穹召唤', style: { flex: 1, width: '100%', border: 0, display: 'block' }, allow: 'autoplay' }))
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: PANEL_ID }, AstralPage))
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist', id: PANEL_ID, order: 5, label: () => '星穹召唤',
        }, StarIcon))
      },
    }
  },
})
