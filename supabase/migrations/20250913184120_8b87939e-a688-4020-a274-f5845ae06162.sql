-- Update salaries to use KSH instead of pounds for Kenya market
UPDATE jobs 
SET salary = CASE 
  WHEN salary = '£25,000 - £30,000' THEN 'KSH 45,000 - KSH 55,000'
  WHEN salary = '£18,000 - £22,000' THEN 'KSH 35,000 - KSH 42,000'  
  WHEN salary = '£20,000 - £25,000' THEN 'KSH 38,000 - KSH 48,000'
  ELSE salary
END
WHERE salary IS NOT NULL;