RETURN 'Setting Colors and Secret Levels';
// Set Icon Color and Secret Levels
LOAD CSV WITH HEADERS FROM 'file:///source_data/skills/skill_base.csv' AS row 
MATCH(englishSkill:Skill {name: row.name_en, language: 'en'})
  SET englishSkill.icon_color=row.icon_color, englishSkill.secret_levels=COALESCE(row.secret, 0)
WITH englishSkill, row
MATCH(englishSkill)-[:TRANSLATES_TO]->(skill:Skill)
  SET skill.icon_color=row.icon_color, skill.secret_levels=COALESCE(row.secret, 0);

RETURN 'Setting Skill Unlocks';
// Associate Unlock Skills with the Skills they unlock
LOAD CSV WITH HEADERS FROM 'file:///source_data/skills/skill_base.csv' AS row
WITH row WHERE row.unlocks IS NOT NULL
MATCH(englishSkill:Skill {name: row.name_en, language: 'en'})
MATCH(englishUnlockedSkill:Skill {name: row.unlocks, language: 'en'})
  MERGE(englishSkill)-[:UNLOCKS]->(englishUnlockedSkill)
WITH englishSkill, englishUnlockedSkill
MATCH(englishSkill)-[:TRANSLATES_TO]->(skill:Skill)
MATCH(englishUnlockedSkill)-[:TRANSLATES_TO]->(unlockedSkill:Skill {language: skill.language})
  MERGE (skill)-[:UNLOCKS]->(unlockedSkill);

RETURN 'Setting First Index of Skill Levels Array';
// SET FIRST INDEX OF SKILL LEVELS ARRAY
LOAD CSV WITH HEADERS FROM 'file:///source_data/skills/skill_levels.csv' AS row 
WITH row WHERE row.level="1"
MATCH(skill:Skill {name: row.base_name_en, language: 'en'})
	SET skill.levels = [row.description_en]
WITH row, skill
MATCH(skill)-[:TRANSLATES_TO]->(translatedSkill:Skill)
	SET translatedSkill.levels = [row["description_"+translatedSkill.language]];

RETURN 'Setting Rest of Skill Level Arrays';
// SET REST OF SKILL LEVELS ARRAY
LOAD CSV WITH HEADERS FROM 'file:///source_data/skills/skill_levels.csv' AS row 
WITH row WHERE row.level<>"1"
MATCH(skill:Skill {name: row.base_name_en, language: 'en'})
	SET skill.levels = skill.levels + [row.description_en]
WITH row, skill
MATCH(skill)-[:TRANSLATES_TO]->(translatedSkill:Skill)
	SET translatedSkill.levels = translatedSkill.levels + [row["description_"+translatedSkill.language]];
