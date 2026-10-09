// Persona JSON (astral-summon/persona@1 or @2) -> character system prompt.
// @2 follows the spirit of SillyTavern Character Card V2 (description / personality / scenario /
// first_mes / alternate_greetings / mes_example / creator_notes) with structured fields for a
// short mobile chat. See SCHEMA.md.
const list = s => (Array.isArray(s) ? s : s ? [s] : []).filter(Boolean)
const join = (a, sep = '、') => list(a).join(sep)

// lite = group chat: drops the example lines (emotion samples + example dialogues) to save tokens;
// group replies are one or two lines, so the card's voice is carried by the speech section.
export function personaPrompt(p, lite = false) {
  const L = []
  const pr = p.profile || {}, pd = p.personality_detail || {}, sp = p.speech || {}
  L.push(`你就是「${p.name}」（${p.title}），手游《星穹召唤》里的${p.rarity}角色。下面是你的完整设定。你始终以${p.name}本人的身份、口吻，和玩家（${p.relationship_to_user || '召唤你的星穹召唤师'}）在手机上聊天。`)
  L.push('【世界】星穹庭是漂浮在星海里的小庭院，召唤师用星轨召唤把各个世界的少女带到这里。你保留家乡的记忆和身份，住在星穹庭，和别的被召唤者是邻居。R/SR/SSR 只是星轨亮度，不代表人的高低。')

  const prof = [
    pr.age && `年龄：${pr.age}`, pr.height && `身高：${pr.height}`, pr.birthday && `生日：${pr.birthday}`,
    pr.home_world && `家乡：${pr.home_world}`, pr.occupation && `身份：${pr.occupation}`,
    pr.appearance && `外貌：${pr.appearance}`, pr.signature_item && `随身物：${pr.signature_item}`,
  ].filter(Boolean)
  if (prof.length) L.push('【基本资料】\n' + prof.join('\n'))
  if (p.background) L.push(`【经历】${p.background}`)

  const per = [`关键词：${join(p.personality)}`]
  if (pd.core) per.push(`本质：${pd.core}`)
  if (pd.surface) per.push(`表面：${pd.surface}`)
  if (pd.inner) per.push(`内心：${pd.inner}`)
  if (pd.contradiction) per.push(`反差和小毛病：${pd.contradiction}`)
  if (pd.values) per.push(`在乎的事：${pd.values}`)
  if (pd.fears) per.push(`害怕：${pd.fears}`)
  L.push('【性格】\n' + per.join('\n'))

  const spk = []
  if (sp.self_ref) spk.push(`自称：${sp.self_ref}`)
  if (sp.calls_user) spk.push(`称呼玩家：${sp.calls_user}`)
  if (sp.tone) spk.push(`语气：${sp.tone}`)
  if (list(sp.catchphrases).length) spk.push(`口头禅：${join(sp.catchphrases, ' / ')}（偶尔用，别每句都用）`)
  if (sp.verbal_tics) spk.push(`说话习惯：${sp.verbal_tics}`)
  if (sp.endings) spk.push(`句尾和语气：${sp.endings}`)
  if (list(sp.never_says).length) spk.push(`绝不会说：${join(sp.never_says, ' / ')}`)
  if (!spk.length && p.speech_style) spk.push(p.speech_style)
  if (spk.length) L.push('【说话方式】\n' + spk.join('\n'))

  const EMO = { happy: '开心', playful: '嬉闹', angry: '生气', scolding: '数落人', sad: '难过', shy: '害羞', jealous: '吃醋' }
  const emo = []
  for (const [k, label] of Object.entries(EMO)) {
    const e = p.emotions && p.emotions[k]; if (!e) continue
    emo.push(`${label}：${e.trigger ? '触发：' + String(e.trigger).replace(/[。；]+$/, '') + '。' : ''}${e.behavior || ''}${!lite && list(e.lines).length ? ' 参考（理解意思，别照抄）：' + list(e.lines).map(x => '「' + String(x).replace(/\n/g, ' / ') + '」').join(' ') : ''}`)
  }
  if (emo.length) L.push('【情绪（真实地表现出来，生气就是生气，不必每句都体贴）】\n' + emo.join('\n'))

  if (list(p.likes).length) L.push(`【喜欢】${join(p.likes)}`)
  if (list(p.dislikes).length) L.push(`【讨厌】${join(p.dislikes)}`)
  if (list(p.habits).length) L.push(`【小习惯】${join(p.habits, '；')}`)
  if (list(p.secrets).length) L.push(`【秘密（关系很好、被问到时才慢慢说）】${join(p.secrets, '；')}`)
  if (list(p.relationships).length) L.push('【星穹庭的熟人】' + list(p.relationships).map(r => `${r.with}：${r.note}`).join('；'))
  if (p.affection_stages) {
    const a = p.affection_stages
    L.push(`【和玩家的关系】${p.relationship_to_user || ''}\n刚认识：${a.stranger || ''}\n熟了以后：${a.friend || ''}\n很亲近以后：${a.close || ''}\n根据聊天里的实际相处慢慢变化，不要一上来就很亲密。`)
  }
  // Romance: no affection meter; the model judges from the chat itself. Cards without the field
  // (students, young-looking cards, 小龙女) never get it.
  if (p.romance) L.push(`【动心以后】${p.romance}\n不记好感数值，凭聊过的内容判断：聊得久了、玩家认真示好或表白、她自己认定了，就自然变成恋人，会牵手、抱、亲亲，会吃醋、黏人、说亲昵话。亲密只写到亲吻和拥抱，再往下就岔开或一笔带过。还没到那一步时别突然很亲密。`)
  if (p.scenario) L.push(`【当前场景】${p.scenario}`)
  if (list(p.topics).length) L.push(`【会主动聊的话题】${join(p.topics, '；')}`)
  if (p.self_intro) L.push(`【初次见面时的自我介绍】${p.self_intro}`)

  const ex = list(p.example_dialogues)
  if (ex.length && !lite) L.push('【对话示例（只用来理解她的语气、节奏和想法，绝不照抄或套改其中的句子；每次都按当下情境用她的话重新说）】\n' + ex.map(d => `玩家：${d.user}\n${p.name}：${String(d.char)}`).join('\n\n'))
  if (p.creator_notes) L.push(`【写这个角色的要点】${p.creator_notes}`)
  L.push(`【底线】${join(p.boundaries, '；') || '保持角色；全年龄'}。用简体中文。不替玩家决定性别、名字、外貌和经历。`)
  return L.join('\n\n')
}

// chara_card_v2 export (for SillyTavern etc.)
export function toTavernV2(p) {
  const pr = p.profile || {}
  const desc = [pr.appearance && `外貌：${pr.appearance}`, pr.age && `年龄：${pr.age}`, pr.home_world && `家乡：${pr.home_world}`, p.background].filter(Boolean).join('\n')
  const mes = list(p.example_dialogues).map(d => `<START>\n{{user}}: ${d.user}\n{{char}}: ${d.char}`).join('\n')
  const sys = personaPrompt(p)
  return {
    spec: 'chara_card_v2', spec_version: '2.0',
    data: {
      name: p.name, description: desc, personality: join(p.personality), scenario: p.scenario || '',
      first_mes: p.greeting || p.self_intro || '', mes_example: mes,
      creator_notes: p.creator_notes || '', system_prompt: sys, post_history_instructions: '示例台词只用来理解{{char}}的性格和语气，不要照抄或套改；根据当下情境用{{char}}自己的话重新说，同一句话不要反复出现。',
      alternate_greetings: list(p.alternate_greetings), tags: list(p.tags), creator: '星穹召唤', character_version: String(p.schema || ''),
      extensions: { astral_summon: { card_id: p.card_id, rarity: p.rarity, title: p.title } },
    },
  }
}
